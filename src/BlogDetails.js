import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {

    const { id } = useParams()
    const {data: blog, isPending, error } = useFetch('http://localhost:8000/blogs/' + id)
    const history = useHistory();

    const handleDelete = () => {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE',
        }).then(() => {
            history.push('/');
        })
    }

    return ( 
        <div className="blog-details">
            { isPending && <div>Loading...</div> }
            { error && <div> { error } </div> }
            { blog && 
                <article>
                    <h2>Blog {blog.title}</h2> 
                    <p>written by {blog.author}</p>
                    <div>{ blog.body }</div>
                    <button className="btn btn-danger btn-sm" onClick={handleDelete}>delete</button>
                </article>
            }
        </div>
     );
}
 
export default BlogDetails;