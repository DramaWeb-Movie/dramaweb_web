interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

export default function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#333333]/50">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag.toLowerCase())}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedTag === tag.toLowerCase()
                ? 'bg-gradient-to-r from-[#E31837] to-[#E31837] text-white shadow-lg'
                : 'bg-[#252525] text-[#B3B3B3] hover:bg-[#333333] hover:text-white border border-[#333333]/50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}




