import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from './LoginForm';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  //toggle - функция изменения состояния модалки
  // toggleModal = () => {
  //   this.setState((prevState) => ({
  //     showModal: !prevState.showModal,
  //   }));
  toggleModal = (test) => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      test,
    }));
  };

  render() {
    console.log('Login render');

    const { showModal } = this.state;

    return (
      <React.Fragment>
        <button
          className="btn btn-warning"
          type="button"
          onClick={this.toggleModal}
        >
          Войти
        </button>
        <Modal isOpen={showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
