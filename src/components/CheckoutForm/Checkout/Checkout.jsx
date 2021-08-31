import React,{useState,useEffect} from 'react'
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button}from '@material-ui/core'
import useStyles from "./styles";
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce} from '../../../lib/commerce.js'
import { Link } from 'react-router-dom';
const steps=["Shipping Address","Payment Details"]

function Checkout({cart,order,onCaptureCheckout,error}) {
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken,setCheckoutToken] = useState(null)
    const [shippingData,setShippingData] = useState({})
    const [isFinished,setIsFinished] = useState(false)
    const classes = useStyles();
    useEffect(()=>{
        const generateToken=async()=>{
            try {
                const token=await commerce.checkout.generateToken(cart.id,{type:'cart'})
                setCheckoutToken(token)
            } catch (error) {
                window.location.href='/'
            }
        }
        generateToken();
    },[cart])
    
    const nextStep=()=>setActiveStep((prevActiveStem)=>prevActiveStem+1)
    const backStep=()=>setActiveStep((prevActiveStem)=>prevActiveStem-1)

    const next=(data)=>{
        setShippingData(data)
        nextStep()
    }

    const timeout=()=>{
        setTimeout(()=>{
            console.log('hello world');
            setIsFinished(true)
        },3000)
    }

    const Form=()=>activeStep===0?<AddressForm  checkoutToken={checkoutToken} next={next}/>:
    <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} timeout={timeout}/>


    const Confirmation=()=>order.customer?(
        <div className="">
            <Typography variant='h5'> thank you for your purchase,{order.customer.firstname} {order.customer.lastname}</Typography>
            <Divider className={classes.divider}/>
            <Typography variant='subtitle2'>Order Reference-{order.customer_reference}</Typography>
            <br />
            <Button vriant='outline' type="button" component={Link} to='/'>Back to home</Button>
        </div>
    ):
    isFinished?(
            <div className="">
            <Typography variant='h5'> thank you for your purchase</Typography>
            <Divider className={classes.divider}/>
            <Typography variant='subtitle2'>Order Reference-</Typography>
            <br />
            <Button vriant='outline' type="button" component={Link} to='/'>Back to home</Button>
            </div>
    ):(
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    )
    if(error){
        <div className="">
            <Typography variant='h5'>Error: {error}</Typography>
            <br />
            <Button vriant='outline' type="button" component={Link} to='/'>Back to home</Button>

        </div>
    }
    return (
        <div>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' aligh='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map((step)=>(<Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>))
                        }
                    </Stepper>
                    {activeStep===steps.length?<Confirmation/>:checkoutToken&&<Form/>}
                </Paper>
            </main>
        </div>
    )
}

export default Checkout
