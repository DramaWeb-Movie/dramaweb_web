import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Marks a payment record as failed when the user cancels or the payment fails.
 * Called by the /payment/failed page via the order_id query param.
 */
export async function POST(request: NextRequest) {
  try {
    const { order_id } = await request.json();

    if (!order_id) {
      return NextResponse.json(
        { error: 'Missing order_id' },
        { status: 400 }
      );
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ status: 'skipped' });
    }

    const adminClient = createAdminClient();

    const { data: payment, error: findError } = await adminClient
      .from('payments')
      .select('id, status')
      .eq('reference', order_id)
      .single();

    if (findError || !payment) {
      return NextResponse.json({ status: 'not_found' });
    }

    // Only update if still pending — don't overwrite a completed payment
    if (payment.status !== 'pending') {
      return NextResponse.json({ status: 'already_resolved', current: payment.status });
    }

    const { error: updateError } = await adminClient
      .from('payments')
      .update({ status: 'failed' })
      .eq('id', payment.id);

    if (updateError) {
      console.error('Failed to mark payment as failed:', updateError);
      return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }

    return NextResponse.json({ status: 'marked_failed', order_id });
  } catch (error) {
    console.error('Payment fail handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
