import React, {useState, useContext} from "react";
import "./checkout_style.css";
import Navbar from "../Components/component_Navbar/Navbar"
import Footer from "../Components/component_Footer/Footer"
import SessaoCheckout from "../Components/component_sessaoCheckout/SessaoCheckout";
import image_produto_bulldog from '../img/image_produto_bulldog.png'
import { IoAddSharp } from "react-icons/io5";
import { IoRemoveSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";
import { HandleCarrinhoContext } from  '../context/HandleContext';  
import  formatarDinheiro from '../Utilidades/formartarDinheiro'
import { HandleDataContext } from '../context/HandleContext';


function Checkout(){
    const {dadosCarrinho, setDadosCarrinho} = useContext(HandleCarrinhoContext)
    const {dadosProduto, setDadosProduto} = useContext(HandleDataContext)


    const precoTotal = dadosCarrinho.reduce((acumulador, item) => {
        return Number(item.preco) + acumulador;
    }, 0)
    

    const removerProdutoCarrinho = () => {
        const index = dadosCarrinho.findIndex(item => item.Id_produtos === dadosProduto.Id_produtos);
        if (index !== -1) {
            const novoArray = [...dadosCarrinho];
            console.log(novoArray)
            novoArray.splice(index, 1);
            setDadosCarrinho(novoArray);
        }
    };

    return(
        <div className="checkout_container">
            <Navbar/>
            <SessaoCheckout/>
            
                <div className="checkout_box_informacoes">
            
            
                <div className="checkout_div_cadastro_entrega">
                    <h2>Informações de cadastro<div className="checkout_linha"/></h2>
                    <div className="checkout_div_form div_cadastro">
                        <input 
                            type="text" 
                            name="nome_completo" 
                            placeholder="Nome completo"
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="E-mail"
                        />
                        <input 
                            type="text" 
                            name="CPF" 
                            placeholder="CPF"
                        />
                        <input 
                            type="text" 
                            name="Celular" 
                            placeholder="Telefone celular"
                        />
                        <span>Já possui uma conta? <span className="azul">Faça login</span></span>
                    </div>
                    <h2 className="title2">Endereço de entrega<div className="checkout_linha"/></h2>
                    <div className="checkout_div_form">
                        <div className="div_opcao_endereco">
                            <p>Escolha uma opção:</p>
                            <div className="opcoes-radio">
                                <div className="opcao">
                                    <input type="radio" className="radio_endereco" name="opcao_endereco" id="novo_endereco"/>
                                    <span>Cadastrar novo endereço</span>
                                </div>
                                <div className="opcao">
                                    <input className="radio_endereco" type="radio" name="opcao_endereco" id="endereco_cadastrado"/> 
                                    <span>Usar endereço cadastrado</span>
                                </div>
                            </div>
                        </div>
                        <input 
    
                            type="text" 
                            name="endereco" 
                            placeholder="Nome do endereco"
                        />
                        <select className="checkout_tipo_endereco">
                            <option value={1}>casa</option>
                            <option value={2}>apartamento</option>
                        </select>
                        <input 
                            className="checkout_input_menor" 
                            type="text" 
                            name="CEP"
                            placeholder="CEP"
                        />
                        <input 
                            className="checkout_input_menor ultimo" 
                            type="text" 
                            name="numero" 
                            placeholder="Número"
                        />
                        <select>
                            <option value={1}>Estado</option>
                            <option value={2}>Option...</option>
                        </select>
                        <select className="checkout_input_maior">
                            <option value={1}>Cidade</option>
                            <option value={2}>Option...</option>
                        </select>
                        <input 
                         
                            type="text" 
                            name="bairro" 
                            placeholder="Bairro, Avenida..."
                        />
                        <input 
                             
                            type="text" 
                            name="rua" 
                            placeholder="Rua"
                        />
                        <input 
                             className="ultimo"
                            type="text" 
                            name="complemento" 
                            placeholder="Complemento"
                        />
                        
                    </div>   
                </div>
                <div className="checkout_div_carrinho_compra">
                    <h2>Carrinho de compra<div className="checkout_linha"/></h2>
                    {dadosCarrinho.map((item) => (<div key={item.Id_produtos} className="item_carrinho_checkout">
                        <div className="produto_carrinho_checkout">
                            <div className="fundo_imagem_checkout">
                                <img src={item.imagem} alt="Algum_Quadro"></img>
                            </div>
                            <div className="dados_produto">
                                <div>
                                    <span>{item.nomeQuadro}</span>
                                    <span className="desconto_vermelho">R$ 128,00</span>
                                    <span className="preco">{formatarDinheiro(item.preco)}</span>
                                </div>
                                <div>
                                    <select>
                                        <option value={1}>Moldura {item.cor}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="acoes_produto">
                                <button onClick={removerProdutoCarrinho}>
                                    <FaRegTrashAlt size={16}></FaRegTrashAlt>
                                </button>
                                <div className="add_del_produto">
                                    <button className="remover_produto_checkout">
                                        <IoRemoveSharp size={17}></IoRemoveSharp>
                                    </button>
                                    <span>2</span>
                                    <button className="adicionar_produto_checkout">
                                        <IoAddSharp size={17}></IoAddSharp>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="dados_subtotal">
                            <div className="subtotal_left">
                                <span className="bold">Subtotal (2 items)</span>
                                <span>Desconto</span>
                            </div>
                            <div className="subtotal_right">
                                <span className="preco">R$ 204,80</span>
                                <span className="desconto_vermelho">R$ 51,20</span>
                            </div>
                        </div>
                    </div>))}
                    <div className="calcular_frete">
                        <span className="bold">Calcular frete</span>
                        <div className="flex_row">
                            <input type="number" id="cep" name="cep" placeholder="CEP"/>
                            <button>Calcular</button>
                        </div>
                    </div>
                    <div className="flex_row dados_total">
                        <span className="bold">Total</span>
                        <span className="preco bold">R$ 204,80</span>
                    </div>
                    <div className="acoes_checkout">
                        <button>Ir para o pagamento</button>
                        <span>Cancelar compra</span>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Checkout;