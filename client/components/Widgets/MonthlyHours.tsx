import { ResponsiveLine } from '@nivo/line'
import { useGetLastThirty } from '../../hooks/Tasks/Tasks'

interface Props {
  publicUserId: string
}

export default function MonthlyHours({ publicUserId }: Props) {
  const { data: history, isLoading } = useGetLastThirty(publicUserId)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (history) {
    return (
      <div className="d-flex flex-row h-100 w-100">
        <span className="d-flex flex-column justify-content-center w-25 ms-3">
          <p className="small fw-light mb-0 mt-3">Hours: Last 7 Days</p>
          <p className="fs-2 fw-bold">
            {history[0].data.reduce((acc, curr) => (acc += curr.y), 0)
              ?? 0}
          </p>
        </span>
        <div
          className="w-100 h-100 position-relative"
          style={{ minWidth: '0' }}
        >
          <ResponsiveLine
            animate={true}
            useMesh={true}
            curve="monotoneX"
            data={history}
            enableGridX={false}
            enableGridY={false}
            axisLeft={null}
            axisBottom={null}
            enablePoints={false}
            colors={'blue'}
            tooltip={({ point }) => (
              <div
                style={{
                  padding: '5px',
                  borderRadius: '4px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  fontSize: '12px',
                  textAlign: 'center',
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>{point.data.xFormatted}</strong>
                  <br />
                  Hours: {point.data.yFormatted}
                </p>
              </div>
            )}
            defs={[
              {
                colors: [
                  {
                    color: 'blue',
                    offset: 0,
                  },
                  {
                    color: 'blue',
                    offset: 100,
                    opacity: 0,
                  },
                ],
                id: 'gradientA',
                type: 'linearGradient',
              },
            ]}
            enableArea={true}
            enableSlices={false}
            enableTouchCrosshair={true}
            fill={[
              {
                id: 'gradientA',
                match: '*',
              },
            ]}
            margin={{
              top: 15,
              right: 5,
              bottom: 15,
              left: 10,
            }}
          />
        </div>
      </div>
    )
  }
}
