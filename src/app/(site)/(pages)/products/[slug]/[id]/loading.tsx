import Preloader from '@/components/Common/PreLoader'

export default function Loading() {
  return (
    // Div ini akan menempatkan preloader di tengah layar dan
    // memastikan halaman loading memiliki tinggi yang cukup.
    <div className="flex items-center justify-center min-h-screen">
      <Preloader />
    </div>
  )
}
