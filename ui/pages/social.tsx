import {
  Box,
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
import Chat from '../components/Chat'

const Social: NextPage = () => {
  return (
    <Layout>
      <Chat />
    </Layout>
  )
}

export default Social
