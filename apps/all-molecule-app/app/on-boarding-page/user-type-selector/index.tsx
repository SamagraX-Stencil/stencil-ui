import farmer from './assets/farmer.jpeg'
import user from './assets/user.svg'
import farmer2 from './assets/farmer-op.svg'
import { useColorPalates } from '../../../provider/theme-provider/hooks'
import { useConfig } from '../../../provider/config-provider/hook'
import { LanguagePicker } from '@samagra-x/stencil-molecules'

const UserTypeSelector = () => {
  const theme = useColorPalates()
  const config = useConfig('component', 'userTypeSelectorPage')

  return (
    <div
      style={{
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        color: '#333',
        margin: 'auto',
        backgroundColor: '#fff',
        minHeight: '80vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '5px',
          right: '8px',
          // left: 'calc(100% - 85px - 10px)',
        }}
      >
        <LanguagePicker />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%', // Adjust this value to move the container up or down
          width: '100%',
          bottom: '0',
          backgroundColor: '#fff',
          borderTopLeftRadius: '30% 5%', // Adjust the curvature
          borderTopRightRadius: '30% 5%',
          overflow: 'hidden', // Ensures content aligns with the curved edges
        }}
      >
        <div className="p-4">
          <p
            style={{
              marginTop: '24px',
              fontSize: '24px',
              fontWeight: 400,
              color: '#51586B',
            }}
          >
            {config?.title || 'कृपया बताएं आप कौन हैं?'}
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '32px',
              alignItems: 'center',
            }}
          >
            {/* Two cards/buttons */}
            <div
              style={{
                backgroundColor: theme.primary.dark,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderRadius: '16px',
                padding: '16px',
                width: '40%',
                textAlign: 'center',
              }}
            >
              <img
                src={config?.user1Image || farmer2.src}
                alt="Farmer"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />

              <p style={{ color: 'white' }}>{config?.user1Text || 'किसान'} </p>
            </div>
            <p>या</p>
            <div
              style={{
                backgroundColor: ' #F4F4F4',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderRadius: '16px',
                padding: '16px',
                width: '40%',
                textAlign: 'center',
              }}
            >
              <img
                src={config?.user2Image || user.src}
                alt="Worker"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />

              <p>{config?.user1Text || 'विस्तार कार्यकर्ता'}</p>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div>
          <img
            src={config?.backgroundImage || farmer.src}
            alt="Farmer with vegetables"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </main>
    </div>
  )
}

export default UserTypeSelector
