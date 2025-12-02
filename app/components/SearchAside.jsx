import {useId} from 'react';
import {Link} from 'react-router';
import {Aside} from '~/components/Aside';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';

export function SearchAside() {
  const queriesDatalistId = useId();

  return (
    <Aside type="search" heading="Search">
      <div className="flex flex-col gap-4">
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <div className="flex flex-col gap-3">
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
                className="w-full rounded-md border border-brand-accent/20 bg-brand-bg px-3 py-2 text-brand-text outline-none ring-1 ring-transparent transition focus:ring-brand-primary"
              />
              <div className="flex gap-3">
                <button
                  onClick={goToSearch}
                  className="btn-primary bg-brand-primary text-brand-bg hover:bg-brand-accent"
                >
                  Search
                </button>
                <button
                  type="button"
                  className="btn-ghost border-brand-accent/30 text-brand-text hover:border-brand-accent hover:bg-brand-accent/5"
                  onClick={() => {
                    if (inputRef.current) inputRef.current.value = '';
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({items, total, term, state, closeSearch}) => {
            const {articles, collections, pages, products, queries} = items;

            if (state === 'loading' && term.current) {
              return <div className="text-sm text-brand-text/70">Loading...</div>;
            }

            if (!total) {
              return (
                <div className="text-sm text-brand-text/70">
                  <SearchResultsPredictive.Empty term={term} />
                </div>
              );
            }

            return (
              <div className="flex flex-col gap-4">
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                    className="text-sm text-brand-primary underline-offset-4 hover:text-brand-accent"
                  >
                    View all results for <q>{term.current}</q> →
                  </Link>
                ) : null}
              </div>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}
