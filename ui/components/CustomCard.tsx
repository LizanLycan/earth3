import { Card, CardContent, CardProps, Theme } from '@mui/material'
import { PropsWithChildren } from 'react'

interface ICustomCard extends PropsWithChildren, CardProps {
  color?: 'primary' | 'secondary'
}

const CustomCard = (props: ICustomCard) => {
  const { color, children, ..._props } = props

  const returnSX = (theme: Theme): any => {
    const { sx } = _props
    if (color) {
      return {
        backgroundColor: theme.palette[color].main,
        color: theme.palette.grey.A100,
        ...sx
      }
    }
    return { ...sx }
  }

  return (
    <Card sx={returnSX} {...props}>
      {children}
    </Card>
  )
}

export default CustomCard
