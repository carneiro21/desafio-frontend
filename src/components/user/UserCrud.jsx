import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir.'
}

const baseUrl = 'http://localhost:8080/usuarios'
const initialState = {
    usuario: {
         nome: '',
         cpf: '',
         cep: '',
         logadouro: '',
         complemento: '',
         cidade: '',
         bairro: '',
         uf: '',
         login: '',
         senha: '',
         listEmail: [
             { email:''},
             { email:''}
         ],
         listTelefone: [
            { ddd:'', telefone:'', tipoTelefone: ''},
            { ddd:'', telefone:'', tipoTelefone: ''},
        ],
    },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.usuario.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CPF</label>
                            <input type="text" className="form-control"
                                name="cpf"
                                value={this.state.usuario.cpf}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o CPF" />
                        </div>
                    </div> 
                </div>
                <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>E-mail</label>
                                <input type="text" className="form-control"
                                    value={this.state.usuario.listEmail[0].email}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite o e-mail principal" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label>E-mail</label>
                                <input type="text" className="form-control"
                                    value={this.state.usuario.listEmail[1].email}
                                    onChange={e => this.updateField(e)}
                                    placeholder="Digite o e-mail secundário" />
                            </div>
                        </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CEP</label>
                            <input type="text" className="form-control"
                                value={this.state.usuario.cep}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o CEP" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Logadouro</label>
                            <input type="text" className="form-control"
                                value={this.state.usuario.logadouro}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o logadouro" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Bairro</label>
                            <input type="text" className="form-control"
                                value={this.state.usuario.bairro}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Bairro" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" className="form-control"
                                value={this.state.usuario.cidade}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a cidade" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>UF</label>
                            <select className="form-control">
                                <option>Selecione</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Complemento</label>
                            <input type="text" className="form-control"
                                value={this.state.usuario.complemento}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o complemento" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Login</label>
                            <input type="text" className="form-control"
                                value={this.state.usuario.senha}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o login" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="text" className="form-control"
                                value={this.state.usuario.login}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a senha" />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}