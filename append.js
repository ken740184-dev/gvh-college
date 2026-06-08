const fs = require('fs');

const bottomContent = `          {/* PUBLISHED BLOCKS GRID WITH DRAG AND DROP */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Published Layout Blocks</h2>
              <p className="text-sm text-gray-500">Drag to reorder</p>
            </div>
            <div className="flex flex-col gap-8">
              {loadingBlocks ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
                </div>
              ) : blocks.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium mb-2">No blocks published yet.</p>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-cyan-600 font-bold hover:text-cyan-700">Create your first block</button>
                </div>
              ) : (
                <div className="flex flex-col">
                  {(() => {
                    const grouped: any[] = [];
                    let currentCardGroup: any = null;

                    blocks.forEach((block, index) => {
                      const blockWithOriginalIdx = { ...block, originalIndex: index };
                      if (blockWithOriginalIdx.layoutType === "single-card") {
                        if (!currentCardGroup) {
                          currentCardGroup = { _id: \`group-\${blockWithOriginalIdx._id}\`, isGroup: true, blocks: [] };
                          grouped.push(currentCardGroup);
                        }
                        currentCardGroup.blocks.push(blockWithOriginalIdx);
                      } else {
                        currentCardGroup = null;
                        grouped.push(blockWithOriginalIdx);
                      }
                    });

                    return grouped.map((item) => {
                      if (item.isGroup) {
                        return (
                          <div key={item._id} className="w-full transition-colors duration-500 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                              {item.blocks.map((block: any) => (
                                <div 
                                  key={block._id}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, block.originalIndex)}
                                  onDragOver={(e) => handleDragOver(e, block.originalIndex)}
                                  onDrop={(e) => handleDrop(e, block.originalIndex)}
                                  className={\`relative group cursor-move \${draggedIdx === block.originalIndex ? 'opacity-50 scale-95' : 'hover:scale-[1.01]'} \${dropIdx === block.originalIndex ? 'ring-4 ring-cyan-500 rounded-xl' : ''} transition-all\`}
                                >
                                  {/* Floating Actions */}
                                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex flex-col gap-2 z-20 transition-opacity">
                                    <button onClick={(e) => { e.stopPropagation(); handleEdit(block); }} className="bg-white p-2 rounded shadow-md hover:bg-cyan-50 text-cyan-600 border border-gray-200" title="Edit">
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); setDeletingId(block._id); deleteGalleryBlock(block._id).then(() => fetchBlocks()); }} className="bg-white p-2 rounded shadow-md hover:bg-red-50 text-red-600 border border-gray-200" title="Delete">
                                      {deletingId === block._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    </button>
                                  </div>

                                  <div className={\`flex flex-col border \${isDarkColor(block.backgroundColor) ? 'border-gray-800' : 'border-gray-200'} \${block.backgroundColor.startsWith('bg-') ? block.backgroundColor : ''} shadow-sm h-full rounded-xl overflow-hidden\`} style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }}>
                                    <div className="bg-gray-100/50 px-3 py-1.5 border-b border-gray-200/50 flex items-center gap-2">
                                      <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">{block.layoutType}</span>
                                      <div className={\`w-3 h-3 rounded-full border border-gray-300 shadow-inner \${block.backgroundColor.startsWith('bg-') ? block.backgroundColor : ''}\`} style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }}></div>
                                    </div>
                                    <div className="p-3 md:p-4 pb-0">
                                      <div className="w-full aspect-square relative overflow-hidden">
                                        {block.images[0] && (
                                          <img src={block.images[0].url} alt="" className="w-full h-full object-cover" />
                                        )}
                                      </div>
                                    </div>
                                    {(block.title || block.description) && (
                                      <div className="p-4 flex flex-col flex-grow">
                                         {block.title && <h3 className="text-lg font-bold mb-1 font-sans text-red-700">{block.title}</h3>}
                                         {block.description && <p className={\`\${isDarkColor(block.backgroundColor) ? 'text-white' : 'text-black'} text-sm\`}>{block.description}</p>}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      // Non-group blocks (bento, single, duo, etc)
                      const block = item;
                      const sortedImages = [...block.images].sort((a: any, b: any) => a.slotIndex - b.slotIndex);
                      
                      const renderImage = (img: any, className: string) => (
                        <div key={img._id} className={\`\${className} relative rounded-none overflow-hidden shadow-sm\`}>
                          <img src={img.url} alt="" className="w-full h-full object-cover" />
                        </div>
                      );

                      return (
                        <div 
                          key={block._id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, block.originalIndex)}
                          onDragOver={(e) => handleDragOver(e, block.originalIndex)}
                          onDrop={(e) => handleDrop(e, block.originalIndex)}
                          className={\`relative group cursor-move \${draggedIdx === block.originalIndex ? 'opacity-50 scale-95' : 'hover:scale-[1.01]'} \${dropIdx === block.originalIndex ? 'ring-4 ring-cyan-500 rounded-xl' : ''} transition-all py-4\`}
                        >
                          {/* Floating Actions */}
                          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 flex flex-col gap-2 z-20 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); handleEdit(block); }} className="bg-white p-2 rounded shadow-md hover:bg-cyan-50 text-cyan-600 border border-gray-200" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); setDeletingId(block._id); deleteGalleryBlock(block._id).then(() => fetchBlocks()); }} className="bg-white p-2 rounded shadow-md hover:bg-red-50 text-red-600 border border-gray-200" title="Delete">
                              {deletingId === block._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            </button>
                          </div>

                          <div className={\`border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col\`}>
                            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-gray-500 tracking-wider uppercase bg-white px-2 py-1 rounded shadow-sm border border-gray-100">{block.layoutType}</span>
                                <div className={\`w-4 h-4 rounded-full border border-gray-300 shadow-inner \${block.backgroundColor.startsWith('bg-') ? block.backgroundColor : ''}\`} style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }} title="Background Color"></div>
                              </div>
                            </div>

                            <div className={\`p-4 md:p-8 \${block.backgroundColor.startsWith('bg-') ? block.backgroundColor : ''}\`} style={{ backgroundColor: block.backgroundColor.startsWith('#') ? block.backgroundColor : undefined }}>
                              {(block.title || block.description) && (
                                <div className="mb-6 max-w-3xl">
                                  {block.title && <h3 className={\`text-2xl font-bold mb-2 font-sans \${isDarkColor(block.backgroundColor) ? 'text-white' : 'text-gray-900'}\`}>{block.title}</h3>}
                                  {block.description && <p className={\`\${isDarkColor(block.backgroundColor) ? 'text-gray-300' : 'text-gray-600'}\`}>{block.description}</p>}
                                </div>
                              )}

                              <div className="w-full max-w-7xl mx-auto">
                                {/* Using the exact renderGrid layouts from gallery page */}
                                {block.layoutType === "single" && sortedImages[0] && renderImage(sortedImages[0], "w-full aspect-[21/9] sm:aspect-[3/1]")}
                                {block.layoutType === "duo" && (
                                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                                    {sortedImages[0] && renderImage(sortedImages[0], "w-full aspect-square md:aspect-[4/3]")}
                                    {sortedImages[1] && renderImage(sortedImages[1], "w-full aspect-square md:aspect-[4/3]")}
                                  </div>
                                )}
                                {block.layoutType === "grid-3" && (
                                  <div className="grid grid-cols-3 gap-2 md:gap-4">
                                    {sortedImages[0] && renderImage(sortedImages[0], "w-full aspect-square md:aspect-[4/3]")}
                                    {sortedImages[1] && renderImage(sortedImages[1], "w-full aspect-square md:aspect-[4/3]")}
                                    {sortedImages[2] && renderImage(sortedImages[2], "w-full aspect-square md:aspect-[4/3]")}
                                  </div>
                                )}
                                {block.layoutType === "bento-4" && (
                                  <div className="grid grid-cols-1 sm:grid-cols-[1.8fr_1fr_1fr] gap-2 md:gap-4">
                                    {sortedImages[0] && renderImage(sortedImages[0], "col-span-1 sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-3 aspect-square sm:aspect-auto sm:h-[400px] md:h-[500px] lg:h-[600px]")}
                                    <div className="col-span-1 sm:col-start-2 sm:col-end-4 grid grid-cols-2 gap-2 md:gap-4">
                                      {sortedImages[1] && renderImage(sortedImages[1], "w-full aspect-square")}
                                      {sortedImages[2] && renderImage(sortedImages[2], "w-full aspect-square")}
                                    </div>
                                    {sortedImages[3] && renderImage(sortedImages[3], "col-span-1 sm:col-start-2 sm:col-end-4 aspect-[21/9] sm:aspect-auto sm:h-full")}
                                  </div>
                                )}
                                {block.layoutType === "bento-5" && (
                                  <div className="grid grid-cols-2 sm:grid-cols-[1fr_1.5fr_1fr] gap-2 md:gap-4">
                                    <div className="col-span-2 sm:col-span-1 flex flex-col gap-2 md:gap-4 h-[300px] sm:h-auto">
                                      {sortedImages[0] && renderImage(sortedImages[0], "w-full flex-1")}
                                      {sortedImages[1] && renderImage(sortedImages[1], "w-full flex-1")}
                                    </div>
                                    {sortedImages[2] && renderImage(sortedImages[2], "col-span-2 sm:col-span-1 aspect-square sm:aspect-auto sm:h-[400px] md:h-[500px] lg:h-[600px]")}
                                    <div className="col-span-2 sm:col-span-1 flex flex-col gap-2 md:gap-4 h-[300px] sm:h-auto">
                                      {sortedImages[3] && renderImage(sortedImages[3], "w-full flex-1")}
                                      {sortedImages[4] && renderImage(sortedImages[4], "w-full flex-1")}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.appendFileSync('src/app/admin/(dashboard)/gallery/page.tsx', bottomContent);
