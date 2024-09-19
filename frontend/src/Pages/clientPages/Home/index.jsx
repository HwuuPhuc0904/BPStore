import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import FlashSaleCardHorizontal from '../../../Components/CardSale/FlashSaleCardHorizontal'
import ImageSlider from '../../../Components/ImageSlider'
import CardProductVertical from '../../../Components/CardProduct/cardProductVertical'
import InterfaceProduct from '../../../Components/InterfaceProduct'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'About me', href: '#' },
]

const categories = [
  { name: 'Đồ điện tử', src: 'icons/electronics.png' },
  { name: 'Điện thoại', src: 'icons/smartphone.png' },
  { name: 'Nhà bếp', src: 'icons/kitchen.png' },
  { name: 'Quần áo', src: 'icons/clother.png' },
  { name: 'Mỹ Phẩm', src: 'icons/cosmetics.png' },
  {name: 'Sách', src: 'icons/book.png'}
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    // More products...
  ]


  return (
    <div className="bg-white ">
      <header className="absolute inset-x-0 top-0 z-50 bg-black bg-transparent">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <img
                alt=""
                src="logo.png"
                className="h-[150px] w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-md font-extrabold leading-6 text-white">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-md font-extrabold leading-6 text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <XMarkIcon className="h-6 w-6"/>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8 bg-black">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Trải nghiệm mua hàng không giới hạn
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              Thử nghiệm mua hàng hoàn toàn mới trên nền tảng của chúng tôi. Mua sắm mọi lúc, mọi nơi, mọi thiết bị.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white ">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>


      {/** this is feature page */}

      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">

            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
               <img src = "/icons/freeship.svg" alt = "freeship icons" className= "w-9 h-9 text-primary-600 lg:w-6 lg:h-6"></img>
              </div>
              <h3 className="mb-2 text-2xl font-extrabold ">Freeship</h3>
              <p className="text-gray-500 dark:text-gray-400">Săn mã Freeship Shopee hôm nay - Voucher Freeship Xtra siêu ưu đãi. Tràn ngập mã miễn phí vận chuyển Shopee chính thức trên toàn quốc.</p>
            </div>

              {/** --------- */}

            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <img src = "/icons/payicons.svg" alt = "freeship icons" className= "w-9 h-9 text-primary-600 lg:w-6 lg:h-6"></img>
              </div>
              <h3 className="mb-2 text-2xl font-extrabold">Thanh toán tiện dụng</h3>
              <p className="text-gray-500 dark:text-gray-400">Trải nghiệm thanh toán dễ dàng với nhiều phương thức thanh toán khác nhau</p>
            </div>

              {/** --------- */}

            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <img src = "/icons/returnicons.svg" alt = "freeship icons" className= "w-9 h-9 text-primary-600 lg:w-6 lg:h-6"></img>
              </div>
              <h3 className="mb-2 text-2xl font-extrabold">Đổi trả hàng dễ dàng</h3>
              <p className="text-gray-500 dark:text-gray-400">Dễ dàng đổi trả hàng với người bán, yên tâm sử dụng với đơn hàng của mình</p>
            </div>

          </div>
        </div>
      </section>



 {/*this is flash sale list */}
      <ImageSlider/>  

  {/*this is fearture list*/}

  <div className="grid grid-cols-6 grid-rows-1 gap-0 mt-4">
      <div > <InterfaceProduct name = {categories[0].name} src = {categories[0].src}/> </div>
      <div > <InterfaceProduct name = {categories[1].name} src = {categories[1].src}/> </div>
      <div ><InterfaceProduct name = {categories[2].name} src = {categories[2].src}/></div>
      <div ><InterfaceProduct name = {categories[3].name} src = {categories[3].src}/></div>
      <div ><InterfaceProduct name = {categories[4].name} src = {categories[4].src}/></div>
      <div ><InterfaceProduct name = {categories[5].name} src = {categories[5].src}/></div>
  </div>
    


  {/*this is flash sale grid*/}
  
    <div className = "bg-white mt-5">
      <div className=" w-4/5 mx-auto">
              <h3 className="mb-2 text-3xl font-extrabold text-left p-4">Chỉ trong hôm nay - Nhanh chân mua sắm ngay</h3>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-y-4 w-4/5 mx-auto">
          
          <div className="row-start-1"> 
            <CardProductVertical/>
          </div>
          <div className="row-start-1">
          <CardProductVertical/>
          </div>
          <div className="row-start-1">
          <CardProductVertical/>
          </div>
          <div className="row-start-1">
          <CardProductVertical/>
          </div>
  

          <div className= "row-start-2"><CardProductVertical/></div>
          <div className="row-start-2"><CardProductVertical/></div>
          <div className="row-start-2"><CardProductVertical/></div>
          <div className="row-start-2"><CardProductVertical/></div>
      </div>
    </div>

    
    


  
    </div>
  );
}