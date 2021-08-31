import React,{useState,useEffect} from 'react'
import {InputLabel,Select,MenuItem,Button,Grid,Topography, Typography}from '@material-ui/core'
import {useForm,FormProvider} from 'react-hook-form'
import CustomTextField from './CustomTextField.js';

import {commerce} from '../../lib/commerce.js'
import { Link } from 'react-router-dom';

function AddressForm({checkoutToken,next}) {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const countries= Object.entries(shippingCountries).map(([code,name])=>({id:code,label:name}))
    const subdivisions= Object.entries(shippingSubdivisions).map(([code,name])=>({id:code,label:name}))
    const options = shippingOptions.map((so)=>({id:shippingOption.id,label:`${so.description} - ${so.price.formatted_with_symbol}`}))

    const methods=useForm();

    const fetchShippingCountries=async(checkoutTokenId)=>{
        const {countries}=await commerce.services.localeListCountries(checkoutTokenId)
        console.log(countries);
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }
    const fetchSubdivisions=async(countryCode)=>{
        const {subdivisions}=await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }
    const fetchShippingOptions=async(checkoutTokenId,country,region='null')=>{
        const options=await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region})
        setShippingOptions(options)
        setShippingOption(options[0])
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        if(shippingCountry)fetchSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if(shippingSubdivision)fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision)
    }, [shippingSubdivision])
    return (
        <div>
            <Typography variant='h6' gutterBottom> Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
                    <Grid container spacing={3}>
                        <CustomTextField  name='firstName' label='First Name'/>
                        <CustomTextField  name='lastName' label='Last Name'/>
                        <CustomTextField  name='address1' label='Address'/>
                        <CustomTextField  name='email' label='Email'/>
                        <CustomTextField  name='city' label='City'/>
                        <CustomTextField  name='pincode' label='Pin Code'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullwidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                {countries.map((country)=>(
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>))}
                                

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullwidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision)=>(
                                <MenuItem key={subdivision.id} value={subdivision.id}>
                                    {subdivision.label}
                                </MenuItem>))}
                                

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullwidth onChange={(e)=>setShippingOption(e.target.value)}>
                            {options.map((option)=>(
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>))}

                            </Select>
                        </Grid>
                    </Grid>
                    <div className="" style={{display:'flex',justifyContent:'space-between'}}>
                        <Button variant='outlined' component={Link} to='/cart'>Back to cart</Button>
                        <Button variant='contained' type='submit' color='primary'>Next</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm
