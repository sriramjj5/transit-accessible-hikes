import { Input } from '@chakra-ui/react'
import TrailAccessibilityComponent from './trailAccessibilityComponent.tsx'
import { Button } from '@chakra-ui/react'
import './App.css'
import { useState } from 'react'

function App() {

  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState("");
  const [datetime, setDatetime] = useState("")

  function onSubmit() {
    if(document.getElementById('address')) {
      let address = (document.getElementById('address') as HTMLInputElement).value;
      if (document.getElementById('datetime')) {
        let datetime = (document.getElementById('datetime') as HTMLInputElement).value;
        setDatetime(datetime);
      }
      setSubmitted(true);
      setAddress(address);
    }
  }

  return (
    <>
      <div className="inputContainer">
        <Input placeholder='Enter your address here.' size='lg' id='address' />
        <Input placeholder='Select date and time' size='lg' type='datetime-local' id='datetime' />
        <Button onClick={onSubmit} colorScheme='green' variant='outline' id='submit'> Submit </Button>
      </div>
      {/* improve styling on below component. 
      add more details to each trail (eg. departure/arrival times)
      work on adding datetime to the request if it's specified
      it's also terribly slow to run, not sure why */}
      { submitted ? <TrailAccessibilityComponent address={address} datetime={datetime} /> : null }
    </>
  )
}

export default App
