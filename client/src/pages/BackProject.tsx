import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL } from '../globals'

import '../styles/App.css'

import { Button, TextField } from '@material-ui/core'

const iStateInfo = {
  id: 0,
  name: '',
  startDate: '',
  endDate: '',
  goal: 1.0,
  campaign: '',
  description: '',
  tags: '',
  userId: 0,
  publishReady: false,
  createdAt: '',
  updatedAt: ''
}

const iStateCheckout = {
  tier: "",
  amount: 0
}

function BackProject() {
  const [projectInfo, setProjectInfo] = useState(iStateInfo)
  const [purchaseForm, setPurchaseForm] = useState(iStateCheckout)
  let params = useParams()
  let navigate = useNavigate()

  const getInfo = async () => {
    const res = await axios.get(`${BASE_URL}/project/search/id/${params.project_id}`)
    setProjectInfo(res.data)
    setPurchaseForm(res.data)
  }

  const purchaseHandleChange = (e: any) => {
    setPurchaseForm({
      ...purchaseForm,
      [e.target.name]: e.target.value || e.target.checked
    })
  }

  const purchaseHandleSubmit = async (e: any) => {
    e.preventDefault()
    //call Stripe API
    //make a checkout session
    //retrieve the key to the checkout session object and stash it for later
    console.log("Submitted.")
  }

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <div>
      Back This Project!

      <form onSubmit={purchaseHandleSubmit}>
        <div className="project-form">
          <TextField
            onChange={purchaseHandleChange}
            name="tier"
            label="Tier"
            value={purchaseForm.tier}
            required
            variant="filled"
          />
          <TextField
            onChange={purchaseHandleChange}
            name="amount"
            label="Amount"
            type="number"
            value={purchaseForm.amount}
            required
            variant="filled"
          />
          <Button color="primary" variant="contained" type='submit'>
            Go to Checkout
          </Button>
        </div>
      </form>
    </div>
  )
}

export default BackProject