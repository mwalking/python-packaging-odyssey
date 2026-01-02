import React from 'react';
import Scrolly from '../../components/Chapter/Scrolly';
import Callout from '../../components/Chapter/Callout';
import Takeaways from '../../components/Chapter/Takeaways';
import StoreViz from '../../visuals/StoreViz';
import Button from '../../components/ui/Button';

const steps = [
  {
    id: 'copy',
    label: 'The Old Way',
    title: 'O(N) Storage',
    body: (
      <>
        <p>
          In traditional package managers (like npm or standard pip), files are <strong>copied</strong> into every project.
        </p>
        <p>
          If you have 50 projects that use <code>pandas</code>, you have 50 copies of <code>pandas</code> on your hard drive. 
          Downloading and writing these files takes time (I/O bound) and wastes massive amounts of space.
        </p>
      </>
    ),
  },
  {
    id: 'store',
    label: 'Architecture',
    title: 'Content Addressable Store',
    body: (
      <>
        <p>
          <code>uv</code> works differently. It maintains a single, central directory (usually `~/.cache/uv`).
        </p>
        <p>
          When you download a package, it is unpacked here exactly once. 
          The directory name is determined by the <strong>SHA256 hash</strong> of the file contents. 
          This is "Content Addressable Storage."
        </p>
      </>
    ),
  },
  {
    id: 'link-a',
    label: 'Linking',
    title: 'O(1) Linking',
    body: (
      <>
        <p>
          When you add `pandas` to Project A, <code>uv</code> does not copy the files.
          It creates a <strong>Reflink</strong> (on macOS/Btrfs/XFS) or a Hardlink (on other Linux).
        </p>
        <p>
          To the operating system, a link looks and behaves exactly like a real file. 
          But on the physical disk, it points to the <em>same bytes</em> as the file in the global store. 
          Creation time is near-instant (milliseconds), regardless of file size.
        </p>
      </>
    ),
  },
  {
    id: 'link-b',
    label: 'Reuse',
    title: 'Deduplication',
    body: (
      <>
        <p>
          Now Project B wants `pandas`. <code>uv</code> sees it is already in the global store.
        </p>
        <p>
          It simply creates another link. No download. No disk write.
          You can create 1,000 environments with `pandas`, and it will consume the disk space of only one copy.
        </p>
      </>
    ),
  },
];

const UvContent = () => (
  <article className="pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        uv: The Global Cache
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
        Speed enables new workflows. When creating an environment takes 10ms instead of 2 minutes, 
        you stop hesitating to isolate your scripts. 
        <code>uv</code> achieves this speed through a radical rethinking of filesystem interaction.
      </p>
    </div>

    <Scrolly steps={steps} Visual={StoreViz} isOverlay={true} />

    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-12">
      <div className="prose prose-lg prose-slate mx-auto">
        <h2>Reflinks: The Secret Sauce</h2>
        <p>
          The magic of <code>uv</code> relies on a filesystem feature called <strong>CoW (Copy on Write)</strong> or Reflinks.
        </p>
        <p>
          Standard "Hardlinks" have a danger: if you modify the file in Project A, it modifies the file in the Global Store (and thus Project B!). 
          This would be a disaster.
        </p>
        <p>
          <strong>Reflinks</strong> solve this. They share the data on disk <em>until one party tries to write to it</em>. 
          The moment Project A modifies a file, the OS seamlessly copies the data to a new location, breaking the link. 
          You get the speed of sharing with the safety of isolation.
        </p>
      </div>

      <div className="bg-slate-900 text-slate-200 rounded-2xl p-8 font-mono text-sm overflow-x-auto shadow-2xl">
         <div className="text-slate-500 mb-4"># Inspecting the cache yourself:</div>
         <div>$ ls -l ~/.cache/uv/archive-v0/</div>
         <div className="text-emerald-400 mt-2">
            drwxr-xr-x  pandas-2.2.0-cp311-cp311-macosx_11_0_arm64.whl
            <br/>
            drwxr-xr-x  numpy-1.26.3-cp311-cp311-macosx_11_0_arm64.whl
         </div>
      </div>

      <div className="mt-16">
        <Takeaways
          points={[
            'uv uses a content-addressable global store to deduplicate packages.',
            'It uses Reflinks (Copy-on-Write) to "copy" files instantly without consuming space.',
            'This architecture allows for O(1) environment creation.',
            'It is written in Rust, allowing for massive parallelism during network downloads.',
          ]}
        />
      </div>

      <div className="mt-16 flex justify-end">
        <Button as="a" href="#/" className="text-lg px-8 py-4 shadow-xl hover:translate-y-[-2px] transition-transform bg-indigo-600 hover:bg-indigo-700 text-white" aria-label="Finish">
          Finish the Odyssey →
        </Button>
      </div>
    </section>
  </article>
);

const chapter = {
  slug: 'uv',
  title: 'uv: The Unified Toolchain',
  subtitle: 'Project management, Python versions, and the end of fragmentation.',
  summary: 'A deep dive into how uv consolidates the entire Python lifecycle into a single, blazing fast binary.',
  readingTime: 12,
  tags: ['Tooling', 'Workflow', 'Rust'],
  component: UvContent,
};

export default chapter;
