import { Navigate, useParams } from 'react-router-dom'
import Aptly from '../demos/Aptly.jsx'
import ForgeArena from '../demos/ForgeArena.jsx'
import FrameVault from '../demos/FrameVault.jsx'
import HarborShop from '../demos/HarborShop.jsx'
import PulseBoard from '../demos/PulseBoard.jsx'

const demos = {
  'harbor-shop': HarborShop,
  'forge-arena': ForgeArena,
  framevault: FrameVault,
  pulseboard: PulseBoard,
  aptly: Aptly,
}

export default function WorkDemo() {
  const { slug } = useParams()
  const Demo = demos[slug]
  if (!Demo) return <Navigate to="/" replace />
  return <Demo />
}
