import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
    
    return (
        <>
            <ErrorBoundary>
                <AppBanner/>
                <ComicsList/>
            </ErrorBoundary>
        </>
    )
}

export default ComicsPage;