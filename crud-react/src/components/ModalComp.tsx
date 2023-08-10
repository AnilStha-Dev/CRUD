import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

interface ModalInter{
    showModal:boolean;
    closeHandler:any;
    setImage: React.Dispatch<React.SetStateAction<string>>;
    edit:boolean;
    setTitle:React.Dispatch<React.SetStateAction<string>>;
    setDescription:React.Dispatch<React.SetStateAction<string>>;
    addProd:any;
    onChangeHandler:any;
    editingProd:any;
    editProdSave:any;
}
const ModalComp:React.FC<ModalInter>= ({onChangeHandler, showModal,closeHandler, setImage, setTitle, setDescription,addProd, edit,editingProd,editProdSave}) => {
  return (
    <Modal
    show={showModal}
  >
    <Modal.Header>
      <Modal.Title>{edit?"Edit-Product":"Add-product"}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicthumbnail">
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" placeholder="thumbnail" onChange={(e)=>
        {onChangeHandler(e);
        setImage(e.target.value)}}
        value={editingProd.thumbnail}
        name='thumbnail'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasictitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="title" 
        value={editingProd.title}
        onChange={(e)=>
          {onChangeHandler(e);
          setTitle(e.target.value)}}
        name='title'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3}
        value={editingProd.description}
        onChange={(e)=>
          {onChangeHandler(e);
          setDescription(e.target.value)}}
        name='description'/> 
      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={(e:any)=>{closeHandler(e)}}>
        Close
      </Button>
      <Button variant="primary" onClick={(e)=>edit?editProdSave(e):addProd(e)}>{edit?"edit":"Add"}</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalComp