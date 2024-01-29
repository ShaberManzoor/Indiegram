import Loader from "./Loader";
import GridList from "./GridList";

type searchResultProps = {
    isSearchFetching: boolean;
    searchedPosts: any;
}

const SearchResults = ({isSearchFetching, searchedPosts}: searchResultProps) => {
    if(isSearchFetching) return <Loader />

    if(searchedPosts && searchedPosts.length > 0){
        return (
            <GridList posts={searchedPosts}/>
        )
    }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No result</p>
  )
}

export default SearchResults