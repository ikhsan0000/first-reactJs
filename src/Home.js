import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {

    const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs');

    return (
        <div className="home">
            { isPending && error == null && <div class="text-center">
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                            </div>}
            { error && <div> {error} </div>}
            {blogs && <BlogList blogs={blogs} title='All blogs' />}
        </div>
      );
}
 
export default Home;