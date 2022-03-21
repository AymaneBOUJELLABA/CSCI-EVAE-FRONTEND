import { Button, Space } from 'antd'

import { Link } from 'react-router-dom'
import React from 'react'

export default function Home() {
  return (
    <>
    <h3>Page d'accueil</h3>
    <Space direction='horizontal' style={{alignItems:'center', justifyContent:'center'}}>
      <Link to ="/rubriques" ><Button type="primary" size='large'>Liste des Rubriques</Button></Link>
      <Link to ="/UniteEnseignements"><Button type="primary" size='large'>Liste des UEs</Button></Link>
    </Space>
    </>
  )
}
