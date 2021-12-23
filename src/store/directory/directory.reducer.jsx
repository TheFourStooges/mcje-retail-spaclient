import config from "../../config/config"

const categoryImages = '/public/data/category/';
const imgPrefix = config.serverHost + categoryImages;

const INITIAL_STATE = {
    sections: [
        {
            title: "Necklaces & Pendants",
            imageUrl: imgPrefix + 'necklaces-pendants.jpg',
            id: 1,
            linkUrl: "shop/necklaces-pendants"
        },
        {
            title: "Bracelets",
            imageUrl: imgPrefix + 'bracelets.jpg',
            id: 2,
            linkUrl: "shop/bracelets"
        },
        {
            title: "Earrings",
            imageUrl: imgPrefix + 'earrings.jpg',
            id: 3,
            linkUrl: "shop/earrings"
        },
        {
            title: "Rings",
            imageUrl: imgPrefix + 'rings.jpg',
            // size: "large",
            id: 4,
            linkUrl: "shop/rings"
        },
        {
            title: "Brooches",
            imageUrl: imgPrefix + 'brooches.jpg',
            // size: "large",
            id: 5,
            linkUrl: "shop/brooches"
        },
        {
            title: "Charms",
            imageUrl: imgPrefix + 'charms.jpg',
            // size: "large",
            id: 6,
            linkUrl: "shop/charms"
        }
    ]
}
const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        default:
            return state
    }
}

export default directoryReducer