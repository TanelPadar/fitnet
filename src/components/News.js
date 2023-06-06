import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/main.css';


function NewsComponent() {
    const [newsItems, setNewsItems] = useState([]);
    const [newNewsText, setNewNewsText] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchNewsItems();
    }, []);

    const fetchNewsItems = () => {
        axios.get('http://localhost:4000/news')
            .then(response => {
                // Update the news items state
                setNewsItems(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleNewsTextChange = (event) => {
        setNewNewsText(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value);
    };

    const handleAddNewsItem = () => {
        const newNewsItem = {
            newsText: newNewsText,
            author: newAuthor,
            postedDate: new Date().toISOString(),
        };

        axios.post('http://localhost:4000/news', newNewsItem)
            .then(response => {
                // Fetch the updated news items after successful addition
                fetchNewsItems();
                // Clear the input fields
                setNewNewsText('');
                setNewAuthor('');
                // Hide the modal
                setShowModal(false);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            <h4 className="my-3">Motivatsiooni nurk</h4>
            <div>
                <div className="text-button"><button className="btn btn primary" type="button" onClick={handleToggleModal}>Lisa uus</button></div>
                <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Uus postitus</h5>
                                <button type="button" className="btn-close" onClick={handleToggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Postituse sisu</label>
                                        <input type="text" className="form-control" value={newNewsText} onChange={handleNewsTextChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Autor</label>
                                        <input type="text" className="form-control" value={newAuthor} onChange={handleAuthorChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleToggleModal}>Tühista</button>
                                <button type="button" className="btn btn-primary" onClick={handleAddNewsItem}>Lisa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {newsItems.map(newsItem => (
                <div className="justify-content-center mt-5" key={newsItem._id}>
                    <div className="d-block gap-2 justify-content-center">
                        <h3>"{newsItem.newsText}"</h3>
                        <div className="d-block">
                            <p className="m-0">{newsItem.author}</p>
                            <p className="m-0 text-muted">{newsItem.postedDate}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NewsComponent;
