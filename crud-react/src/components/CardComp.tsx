import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface CardCompProps {
  prod: ProductInterface;
  deleteHandler:any;
  editHandler:any;
}

const CardComp:React.FC<CardCompProps> = ({ prod,deleteHandler,editHandler}) => {
  return (
    <Card style={{ width: '18rem' }} className='mt-4 mb-3'>
      <Card.Img variant="top" src={prod.thumbnail} />
      <Card.Body>
        <Card.Title>{prod.title}</Card.Title>
        <Card.Text>
          {(prod.description.length>30)?prod.description.slice(0,60)+"...":prod.description}
        </Card.Text>
        <Button variant="primary" className='btn btn-primary'onClick={(e)=>editHandler(e,prod)}>Edit</Button>
        <Button variant="primary" className='btn btn-danger' onClick={(e)=>{deleteHandler(e,prod.id)}}>Delete</Button>
      </Card.Body>
    </Card>
  )
}

export default CardComp