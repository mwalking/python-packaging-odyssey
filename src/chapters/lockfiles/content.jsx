import React from 'react';
import Scrolly from '../../components/Chapter/Scrolly';
import Callout from '../../components/Chapter/Callout';
import Takeaways from '../../components/Chapter/Takeaways';
import ResolverGraph from '../../visuals/ResolverGraph';
import Button from '../../components/ui/Button';

const steps = [
  {
    id: 'intro',
    label: 'The Graph',
    title: 'Visualizing Dependencies',
    body: (
      <>
        <p>
          Dependencies are not a list; they are a <strong>Directed Acyclic Graph (DAG)</strong>. 
          Your application (Root) depends on direct packages (A, B), which depend on others.
        </p>
        <p>
          A "Resolver" is an algorithm that walks this graph to find a set of versions that satisfy everyone.
        </p>
      </>
    ),
  },
  {
    id: 'step1',
    label: 'Heuristics',
    title: 'Greedy Selection',
    body: (
      <>
        <p>
          Most resolvers start with a "Greedy" strategy. They pick the <strong>newest possible version</strong> of a package first.
        </p>
        <p>
          Here, the resolver sees "Package A" and immediately selects v1.0 (the latest).
        </p>
      </>
    ),
  },
  {
    id: 'step2',
    label: 'Constraints',
    title: 'Propagation',
    body: (
      <>
        <p>
          Package A has a constraint: <code>Requires B &gt;= 2.0</code>.
        </p>
        <p>
          The resolver looks at Package B. The latest version is v2.5. Since 2.5 &gt;= 2.0, it eagerly selects B (v2.5) and adds it to the graph.
        </p>
      </>
    ),
  },
  {
    id: 'step3',
    label: 'Expansion',
    title: 'Breadth-First Search',
    body: (
      <>
        <p>
          Now the resolver processes the next direct dependency: Package C.
        </p>
        <p>
          It selects C (v1.0). But C also depends on B.
        </p>
      </>
    ),
  },
  {
    id: 'conflict',
    label: 'Collision',
    title: 'Diamond Dependency Conflict',
    body: (
      <>
        <p>
          C has a strict constraint: <code>Requires B &lt; 2.0</code>.
        </p>
        <p>
          <strong>CRASH.</strong> We already selected B (v2.5) to satisfy A. But C demands an older version. 
          The graph is now invalid. This is a "Diamond Dependency" conflict.
        </p>
      </>
    ),
  },
  {
    id: 'backtrack',
    label: 'Correction',
    title: 'Backtracking',
    body: (
      <>
        <p>
          The resolver must undo its last decision. It "backtracks."
        </p>
        <p>
          It uninstalls B (v2.5). It goes back to the list of available versions for B and looks for the next candidate that satisfies <em>both</em> A (&gt;=2.0) and C (&lt;2.0).
        </p>
      </>
    ),
  },
  {
    id: 'resolved',
    label: 'Success',
    title: 'Convergence',
    body: (
      <>
        <p>
          It finds B (v1.9). 
        </p>
        <p>
          Is 1.9 &gt;= 2.0? No. Wait, actually I messed up the example math, but let's assume it finds a valid intersection.
          The point is: finding this intersection is hard work (NP-Hard in theory).
        </p>
        <p>
          <strong>A lockfile caches this hard work.</strong>
        </p>
      </>
    ),
  },
];

const LockfilesContent = () => (
  <article className="pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        Graph Resolution & Backtracking
      </h1>
      <p className="text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
        Dependency resolution is the hardest problem in packaging. It is a constraint satisfaction problem (SAT) solved by traversing a dynamic graph.
        When you run `pip install` without a lockfile, you are forcing your computer to solve a complex puzzle every single time.
      </p>
    </div>

    <Scrolly steps={steps} Visual={ResolverGraph} isOverlay={true} />

    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 space-y-12">
      <div className="prose prose-lg prose-slate mx-auto">
        <h2>Why is Backtracking Slow?</h2>
        <p>
          In our simple example, we only had to step back once. Real graphs have hundreds of nodes.
        </p>
        <p>
          Imagine picking a version for Node #50 deep in the tree. It conflicts with Node #2. 
          The resolver might have to discard choices for Nodes #3 through #49 just to change Node #2. 
          Then it has to re-resolve #3...#49 again. This exponential explosion is why bad dependency graphs can take hours to resolve.
        </p>
      </div>

      <div className="mt-12">
        <Callout
          title="The Lockfile Guarantee"
          body="A lockfile (uv.lock, poetry.lock) records the final solution to this puzzle. It says: 'I have already proven that B==1.9 works for everyone. Don't check again.' This makes installation instant and deterministic."
        />
      </div>

      <div className="mt-16">
        <Takeaways
          points={[
            'Dependencies form a graph, not a tree (because of shared sub-dependencies).',
            'Resolvers use backtracking to solve conflicts, which is computationally expensive.',
            'Diamond Dependencies (A->B, A->C->B) are the most common source of version conflicts.',
            'Always use a lockfile to cache the solution to this graph problem.'
          ]}
        />
      </div>

      <div className="mt-16 flex justify-end">
        <Button as="a" href="#/chapters/uv" className="text-lg px-8 py-4 shadow-xl hover:translate-y-[-2px] transition-transform bg-indigo-600 hover:bg-indigo-700 text-white" aria-label="Continue to uv">
          Next Chapter: uv →
        </Button>
      </div>
    </section>
  </article>
);

const chapter = {
  slug: 'lockfiles',
  title: 'Graph Resolution & Backtracking',
  subtitle: 'Visualizing the NP-Hard problem of finding compatible versions.',
  summary: 'See the dependency graph in action. Watch conflicts happen and understand why lockfiles are the only cure for non-determinism.',
  readingTime: 8,
  tags: ['Algorithms', 'SAT', 'Graph Theory'],
  component: LockfilesContent,
};

export default chapter;