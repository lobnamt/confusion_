import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, 
    ModalHeader, ModalBody, Form, FormGroup, Input, Label, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';


    class CommentForm extends Component {
        constructor(props) {
            super(props);
            
        
        this.state = {
            rating: '',
            name: '',
            comment: '',
            isCommentModalOpen: false,
            touched: {
                name: false
            }
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);


    }
        toggleModal(){
            this.setState({
                isCommentModalOpen: !this.state.isCommentModalOpen
            });
        }

        handleSubmitComment(event) {
            console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
            

        }
        handleInputChange(event) {
            const target = event.target;
            const value = target.value;
            const name = target.name;
        
            this.setState({
              [name]: value
            });
        }
        handleBlur = (field) => (evt) => {
            this.setState({
                touched: { ...this.state.touched, [field]: true }
            });
        }
    
        validate(name) {
            const errors = {
                name: ''
            };
    
            if (this.state.touched.name && name.length <= 2)
                errors.name = 'Must be greater than 2 characters';
            else if (this.state.touched.name && name.length > 15)
                errors.name = 'Must be 15 characters or less';
            return errors
        }




    render(){
        const errors = this.validate(this.state.name)
        return (
            
            <div className="col-12">
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg"></span> Submit Comment
                </Button>
                
                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmitComment}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Input type="select" name="rating" id="rating"
                                        value={this.state.rating}
                                        onChange={this.handleInputChange}>
                                        
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" name="name" id="name" value={this.state.name} placeholder="Name"
                                       invalid={errors.name !== ''} 
                                       valid={errors.name === ''}
                                       onBlur={this.handleBlur('name')}
                                       onChange={this.handleInputChange}/>
                                <FormFeedback>{errors.name}</FormFeedback>
                            </FormGroup>
                            <FormGroup rows="6">
                                <Label htmlFor="comment">Comment</Label>
                                <Input type="textarea" name="comment" value={this.state.comment} id="comment"
                                        onChange={this.handleInputChange} rows="6"/>
                            </FormGroup>
                            <Button type="submit" value="submit" className="bg-primary">Submit</Button>
                                

                        </Form>
                    </ModalBody>
                </Modal>
            </div>        
)

    }}



    function RenderDish({dish}) {
            return(
                <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </div>
            );

        }
    function RenderComments({comments}) {
        if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className = "list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                            <p>{comment.comment}</p>
                              
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            }).format(new Date(Date.parse(comment.date)))}
                            </p>
                            </li>
                            
                        );
                    })}
                </ul>
                <CommentForm/>
          
            </div>       
          );
          else
            return(
                <div></div>
            );

    }
    const DishDetail = (props) => {
        if (props.dish != null)    
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>   
                </div>
                <div  key={props.dish.id} className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}/>
                   
                    
                </div>
                
                
            </div>
        );
        else
            return(
                <div></div>
            );

        
    }
export default DishDetail