import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        info: {},
        page: 1,
    }
    
    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const {docs, ...info} = response.data;
        this.setState({products: docs, info, page});
    }

    prevPage = () => {
        const {page} = this.state;
        if (page === 1) return;
        const pageNum = page - 1;        
        this.loadProducts(pageNum);
    }
        
    
    nextPage = () => {
        const {page, info} = this.state;
        if (page === info.pages) return;
        const pageNum = page + 1;        
        this.loadProducts(pageNum);
    }
    
    render() {
        const {products, page, info} = this.state;
        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                     <strong> {product.title}</strong>
                     <p>{product.description}</p>
                     <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === info.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        );
    }
}