import { useTheme } from 'antd-style'
import './App.css'
import { AuthorizationPage } from './pages/AuthorizationPage'

function App() {
  const theme = useTheme();
  // const [count, setCount] = useState(0)

  return (
    <div style={{ background: theme.colorBgLayout, minHeight: '100vh', width: '100vw' }}>
      <AuthorizationPage/>
    </div>
  )
}

export default App
