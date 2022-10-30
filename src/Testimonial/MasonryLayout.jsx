import { StarRating } from './StarRating';
// import { testimonialsData, QuoteIcon } from './Testimonials';
import { ThemeContext } from '../Studio/studio';
import { useContext } from 'react';


export function MasonryLayout({testimonialsData}) {
  const masonryData = [[],[],[]];
  testimonialsData.map((data,id)=>{
    masonryData[id%3].push(data)
  })
  const context = useContext(ThemeContext);
  const bgStyle = {"backgroundColor":context[0].bgcolor}
  const cardBGStyle = {"backgroundColor":context[0].cardBgColor}
  const textStyle = {"color":context[0].textColor}
  const borderStyle = {"borderColor":context[0].sepColor}
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="py-8 sm:py-12"
      style={bgStyle}
    >
      <div>
        <div className="mx-auto max-w-2xl md:text-center">

        </div>
        <ul
          role="list"
          className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-4 lg:max-w-none lg:grid-cols-3 px-10"
        >
          {masonryData.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10" style={cardBGStyle}>
                      {testimonial?.rating && <StarRating rating={testimonial?.rating} />}
                      {/* <QuoteIcon className="absolute top-6 left-6 fill-slate-100" /> */}
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900" style={textStyle}>
                          {testimonial?.text}
                        </p>
                      </blockquote>
                      
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6" style={borderStyle}>
                        <div className="overflow-hidden rounded-full bg-slate-50">
                          <img
                            className="h-14 w-14 object-cover"
                            src={testimonial?.profile_image_url}
                            alt=""
                            width={56}
                            height={56} />
                        </div>
                        <div>
                          <p className="font-display text-base text-slate-900" style={textStyle}>
                            {testimonial?.name}
                          </p>
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
