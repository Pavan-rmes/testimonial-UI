import { useState } from "react"

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const tabs = [
    { name: 'Accepted Testimonials',id:"accepted"},
    { name: 'Pending Testimonials',id:"pending"},
    { name: 'Insights',id:"insights"},
    { name: 'Customize the widget',id:"customize"},
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export function NavigationTab({ state, setState }) {

    function handleClick(name){
        if(name === "customize"){
            
            (state === "customize") ?setState("accepted"):setState("customize")
        }
        else{
            setState(name)
        }
    }
    console.log(state)

    return (
      <div className="mt-2 mx-5">
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                onClick={() => {handleClick(tab.id)}}
                  key={tab.name}
                  className={classNames(state === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                    //   tab.id === "customize" && state !== "accepted" ?'hidden':'block',
                    'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm cursor-pointer'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                  {tab.count ? (
                    <span
                      className={classNames(
                        tab.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                        'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block'
                      )}
                    >
                      {tab.count}
                    </span>
                  ) : null}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    )
  }
  
  