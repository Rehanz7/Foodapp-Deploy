import './styles.css';




const favoritesItem = (props) => {
    const { id, image, title, removeFromFavorites} = props;

    return (
        <div key={id} className="favorite-item">
            <div>
                <img src={image} alt="recipe" />
            </div>
            <p>
                {title}
            </p>
            <button type='button' onClick={removeFromFavorites}>
                Remove
            </button>
        </div>
    )
}

export default favoritesItem;