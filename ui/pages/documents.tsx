import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid
} from '@mui/material'
import type { NextPage } from 'next'
import CustomCard from '../components/CustomCard'
import Layout from '../components/Layout'
import CustomTable from '../components/CustomTable'
import TextEditor from '../components/TextEditor'

const Home: NextPage = () => {
  return (
    <Layout>
      <Container>
        <TextEditor />
      </Container>
    </Layout>
  )
}

export default Home
