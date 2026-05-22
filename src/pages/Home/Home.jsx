import { BarChart } from '../../components/Home-Echart.jsx'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <BarChart
        xData={['Vue', 'React', 'Angular']}
        sData={[2000, 5000, 1000]} title="框架用户对比" />

      <BarChart
        title="框架对比"
        xData={['Vue', 'React', 'Angular']}
        sData={[200, 500, 100]}
        style={{ width: '700px', height: '600px' }} />
    </div>
  )
}
export default Home