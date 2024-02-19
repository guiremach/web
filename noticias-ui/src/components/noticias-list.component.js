import React, { Component } from "react";
import NoticiaDataService from "../services/noticia.service";
import { Link } from "react-router-dom";

export default class NoticiasList extends Component {
  constructor(props) {
    super(props);
    this.retrieveNoticias = this.retrieveNoticias.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      noticias: [],
      currentNoticia: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveNoticias();
  }
  retrieveNoticias() {
    NoticiaDataService.getAll()
      .then(response => {
        this.setState({
          noticias: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveNoticias();
    this.setState({
      currentNoticia: null,
      currentIndex: -1
    });
  }


  render() {
    const { searchTitle, noticias, currentNoticia, currentIndex } = this.state;

    return (
      <div className=" row">
        
          <h4>Últimas notícias</h4>
		  
			<div className="container">
			    {noticias &&
              noticias.map((noticia, index) => (
				<div className="row">
					<div className="col">
					<h4> 	<img width="180" src={noticia.thumbnail} />     <Link
                  to={"/noticia/" + noticia.id}
                  target="_blank" rel="noopener noreferrer"
                >
                 {noticia.titulo}
                </Link>
				</h4>
					</div>
				</div>
				))}
			</div>
   
      </div>
    );
  }
}
