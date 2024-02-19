import React, { Component } from "react";
import NoticiaDataService from "../services/noticia.service";
import { withRouter } from '../common/with-router';
import parse from 'html-react-parser';

class Noticia extends Component {
  constructor(props) {
    super(props);
    this.getNoticia = this.getNoticia.bind(this);
    this.updateNoticia = this.updateNoticia.bind(this);
    this.deleteNoticia = this.deleteNoticia.bind(this);

    this.state = {
      currentNoticia: {
        id: null,
        chapeu: "",
        url: "",
        titulo: "",
        data_hora_publicacao: "",
        imagem: "",
        thumbnail: "",
        conteudo: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getNoticia(this.props.router.params.id);
  }

  getNoticia(id) {
    NoticiaDataService.get(id)
      .then(response => {
        this.setState({
          currentNoticia: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateNoticia() {
    NoticiaDataService.update(
      this.state.currentNoticia.id,
      this.state.currentNoticia
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The noticia was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteNoticia() {    
    NoticiaDataService.delete(this.state.currentNoticia.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/noticias');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentNoticia } = this.state;
    const  conteudo  = parse(currentNoticia.conteudo);
	const data_hora = new Date(currentNoticia.data_hora_publicacao);
	
	const not_ano = data_hora.getFullYear()
    const not_mes = String(data_hora.getMonth() + 1).padStart(2, '0')
    const not_dia = String(data_hora.getDate()).padStart(2, '0')
    const not_hora = String(data_hora.getHours()).padStart(2, '0')
    const not_minuto = String(data_hora.getMinutes()).padStart(2, '0')
	
    return (
      <div>
        {currentNoticia ? (
          <div className="container">
		    
			
			<div className="row">
			  <div className="col-12"><h1>{currentNoticia.chapeu}</h1></div>
			  <div className="col-12"><h3>{currentNoticia.titulo}</h3></div>
			  <div className="col-12" align="center"><img src={currentNoticia.imagem} /></div>
			  <div className="col-12"><strong>Publicado em: {not_dia}/{not_mes}/{not_ano} {not_hora}:{not_minuto}</strong></div>
			  <div className="col-12">{conteudo}</div>
			</div>
			
          </div>
        ) : (
          <div>
            <br />
            <p>Notícia não encontrada</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Noticia);