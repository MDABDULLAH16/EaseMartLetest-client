
import { MdLocationOn, MdSearch } from "react-icons/md";
const PhysicalStorePage = () => {
  return (
      <div  className="bg-gradient-to-r h-40  my-8 flex sm:flex-col md:flex-row lg:flex-row  items-center justify-between rounded-md p-4 from-[#0FB6E5] to-[#062785]">
          
          <header className="text-white  flex-col md:flex-row lg:flex-row  flex items-start gap-4">
          <span><MdLocationOn className="text-red-600 ml-4 text-5xl"></MdLocationOn></span>
              <div>
              <h1 className="lg:text-3xl text-white font-bold">20+ Physical Stores</h1>
              <p>Visit Our Store & Get Your Desired Product !</p>
        </div>
          </header>
          <button className="btn  border rounded-full">find our store <MdSearch className="text"></MdSearch></button>
    </div>
  );
};

export default PhysicalStorePage;
