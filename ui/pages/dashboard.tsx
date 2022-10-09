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

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <CustomCard color="secondary">
              <CardHeader title={'Tilte'} />
              <CardContent>Picha tu</CardContent>
            </CustomCard>
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomTable />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Dashboard
