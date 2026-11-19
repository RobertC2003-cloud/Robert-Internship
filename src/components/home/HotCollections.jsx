import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    .then((response) => response.json())
    .then((data) => setCollections(data))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
}, []);

  return (

    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
  <div className="row">
    {[...Array(4)].map((_, index) => (
      <div className="col-lg-3 col-md-6" key={index}>
        <div className="nft_coll">
          <div className="movie__img--skeleton"></div>
        </div>
      </div>
    ))}
  </div>
) : (

  <OwlCarousel
  className="owl-theme"
  loop
  margin={20}
  nav
  responsive={{
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 4 },
  }}
>
          {collections.map((collection) => (
            <div className="item" key={collection.id}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collection.nftImage} className="lazy img-fluid" alt={collection.title} />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img src={collection.authorImage} className="lazy pp-coll" alt="Collection author" />                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{collection.title}</h4>
                  </Link>
                 <span>ERC-{collection.code}</span>
                </div>
              </div>
            </div>
          ))}
          </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
