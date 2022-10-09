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

const Home: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <CustomCard color="secondary">
              <CardHeader title={'Apwine Earth3'} />
              <CardContent>
                fgyhghjkghkghjgyu
              </CardContent>
            </CustomCard>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default Home
