import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'; 
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';


export default function ProductItem(props) {
    return (
        <div>
            <Card sx={{ maxWidth: "100%" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="200"
                        image={require(`../assets/productImage/${props.pic}`)}
                        alt="green iguana"
                    />
                    <CardContent>
                        <h5 style={{ height: "50px" }}>{props.name}</h5>
                        <p> Price &#8377;<del className='text-danger'> {props.baseprice}</del>{props.finalprice} </p>
                        <p>Discount {props.discount}%</p>
                    </CardContent>
                    <CardActions>
                        <Link to={`/single-product/${props._id}`} className='text-decoration-none text-center d-block w-100 background text-dark p-2 rounded'>Add to Cart</Link>
                    </CardActions>
                </CardActionArea>
            </Card>
        </div>
    )
}
