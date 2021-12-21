import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('jerry');
    const [isPending, setIsPending] = useState(false)

    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author }
        setIsPending(true)

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            setIsPending(false);
            // history.go(-1)  //go back one action
            history.push('/');
        })
        
    }

    return (  
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                required 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                />
                <label>Blog author:</label>
                <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="jerry">Jerry</option>
                    <option value="terry">Terry</option>
                </select>
                
                {!isPending && <button>Submit Blog</button>}
                {isPending &&   <button disabled>
                                <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> &nbsp;
                                Submitting ...
                                </button>}
            </form>
        </div>
        
    );
}
 
export default Create;