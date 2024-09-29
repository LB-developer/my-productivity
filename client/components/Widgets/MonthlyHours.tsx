import { ResponsiveLine } from '@nivo/line'
import { useGetLastThirty } from '../../hooks/Tasks/Tasks'

interface Props {
  userId: string
}

export default function MonthlyHours({ userId }: Props) {
  const { data: history } = useGetLastThirty(userId)

  if (history) {
    return (
      <div className="flex flex-row h-full w-full">
        <span className="flex flex-col justify-center w-4/12 ml-5">
          <p className="text-sm font-extralight">Hours this month</p>{' '}
          <p className="text-2xl font-bold">
            {history[0].data.reduce((acc, curr) => (acc += curr.y), 0)}
          </p>
        </span>
        <div className="w-full h-full relative min-w-0">
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
              right: 10,
              bottom: 5,
              left: 10,
            }}
          />
        </div>
      </div>
    )
  }
}
