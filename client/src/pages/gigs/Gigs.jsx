// import React, { useState, useRef, useEffect } from "react";
// import "./Gigs.scss";
// import GigCard from "../../components/gigCard/GigCard";
// import { Link, useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   cleaning,
//   childcare,
//   petcare,
//   plumbing,
//   electrical,
//   gardening,
//   painting,
//   carpentry,
//   emergency,
// } from "../../data.js";

// const Gigs = () => {
//   const [sort, setSort] = useState("sales"); // Default sorting by sales
//   const [min, setMin] = useState(0); // Minimum price filter
//   const [max, setMax] = useState(Infinity); // Maximum price filter
//   const [filteredGigs, setFilteredGigs] = useState([]); // Filtered and sorted gigs
//   const [open, setOpen] = useState(false); // Dropdown visibility
//   const dropdownRef = useRef(); // Ref for dropdown
//   const minRef = useRef();
//   const maxRef = useRef();

//   const { search } = useLocation();

//   // Extract category from query string
//   const params = new URLSearchParams(search);
//   const category = params.get("cat");

//   // Map categories to arrays
//   const categoryData = {
//     cleaning,
//     childcare,
//     petcare,
//     plumbing,
//     electrical,
//     gardening,
//     painting,
//     carpentry,
//     emergency,
//   };

//   const gigs = categoryData[category] || []; // Get gigs for the selected category

//   // Sorting and filtering logic
//   useEffect(() => {
//     let updatedGigs = [...gigs];
//     console.log("Gigs data:", updatedGigs);

//     // Filter by min and max price
//     updatedGigs = updatedGigs.filter(
//       (gig) => gig.price >= min && gig.price <= max
//     );

//     // Apply sorting
//     updatedGigs.sort((a, b) => {
//       if (sort === "sales") return b.sales - a.sales; // Sort by sales
//       if (sort === "createdAt")
//         return new Date(b.createdAt) - new Date(a.createdAt); // Sort by date
//       if (sort === "priceAsc") return a.price - b.price; // Sort by price (low to high)
//       if (sort === "priceDesc") return b.price - a.price; // Sort by price (high to low)
//       return 0;
//     });

//     setFilteredGigs(updatedGigs); // Update the filtered gigs
//   }, [gigs, min, max, sort]); // Re-run when gigs, min, max, or sort changes

//   // Apply filters on button click
//   const handleApplyFilters = () => {
//     const minValue = parseInt(minRef.current?.value || "0", 10); // Parse min value
//     const maxValue = parseInt(maxRef.current?.value || Infinity, 10); // Parse max value

//     // Ensure valid numbers for min and max
//     if (!isNaN(minValue)) setMin(minValue);
//     if (!isNaN(maxValue)) setMax(maxValue);
//   };

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false); // Close dropdown
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="gigs">
//       <ToastContainer />
//       <div className="container">
//         <span className="breadcrumbs">
//           SEVASQUAD &gt; {category?.toUpperCase() || "SERVICE"}
//         </span>
//         <h1>
//           {category
//             ? `${category.charAt(0).toUpperCase() + category.slice(1)} Experts`
//             : "Gigs"}
//         </h1>
//         <p>
//           {`Expert ${
//             category || "service"
//           } services delivered by trusted SevaSquad professionals.`}
//         </p>
//         <div className="menu">
//           <div className="left">
//             <span>Budget</span>
//             <input ref={minRef} type="number" placeholder="min" />
//             <input ref={maxRef} type="number" placeholder="max" />
//             <button onClick={handleApplyFilters}>Apply</button>
//           </div>
//           <div className="right">
//             <span className="sortBy">Sort By :</span>
//             <span className="sortType">
//               {sort === "sales"
//                 ? "Best Selling"
//                 : sort === "createdAt"
//                 ? "Newest"
//                 : sort === "priceAsc"
//                 ? "Price: Low to High"
//                 : "Price: High to Low"}
//             </span>
//             <img
//               src="./img/down.png"
//               alt="Dropdown"
//               onClick={() => setOpen(!open)}
//             />
//             {open && (
//               <div className="rightMenu" ref={dropdownRef}>
//                 <span onClick={() => setSort("sales")}>Best Selling</span>
//                 <span onClick={() => setSort("createdAt")}>Newest</span>
//                 <span onClick={() => setSort("priceAsc")}>
//                   Price: Low to High
//                 </span>
//                 <span onClick={() => setSort("priceDesc")}>
//                   Price: High to Low
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="cards">
//           {filteredGigs.length === 0 ? (
//             <p>No gigs available for this category.</p>
//           ) : (
//             filteredGigs.map((gig) => (
//               <Link
//                 to={`/gigs/single/${gig._id}`} // Replaced userId with _id
//                 className="link"
//                 key={gig._id} // Replaced userId with _id
//               >
//                 <GigCard item={gig} />
//               </Link>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gigs;

// import React, { useState, useRef, useEffect } from "react";
// import "./Gigs.scss";
// import GigCard from "../../components/gigCard/GigCard";
// import { Link, useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   cleaning,
//   childcare,
//   petcare,
//   plumbing,
//   electrical,
//   gardening,
//   painting,
//   carpentry,
//   emergency,
// } from "../../data.js";

// const Gigs = () => {
//   const [sort, setSort] = useState("sales");
//   const [min, setMin] = useState(0);
//   const [max, setMax] = useState(Infinity);
//   const [filteredGigs, setFilteredGigs] = useState([]);
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef();
//   const minRef = useRef();
//   const maxRef = useRef();

//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const category = params.get("cat");

//   const categoryData = {
//     cleaning,
//     childcare,
//     petcare,
//     plumbing,
//     electrical,
//     gardening,
//     painting,
//     carpentry,
//     emergency,
//   };

//   const gigs = categoryData[category] || [];

//   useEffect(() => {
//     let updatedGigs = [...gigs];
//     console.log("Gigs data:", updatedGigs);

//     updatedGigs = updatedGigs.filter(
//       (gig) => gig.price >= min && gig.price <= max
//     );

//     updatedGigs.sort((a, b) => {
//       if (sort === "sales") return b.sales - a.sales;
//       if (sort === "createdAt")
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       if (sort === "priceAsc") return a.price - b.price;
//       if (sort === "priceDesc") return b.price - a.price;
//       return 0;
//     });

//     setFilteredGigs(updatedGigs);
//   }, [gigs, min, max, sort]);

//   const handleApplyFilters = () => {
//     const minValue = parseInt(minRef.current?.value || "0", 10);
//     const maxValue = parseInt(maxRef.current?.value || Infinity, 10);

//     if (!isNaN(minValue)) setMin(minValue);
//     if (!isNaN(maxValue)) setMax(maxValue);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="gigs">
//       <ToastContainer />
//       <div className="container">
//         <span className="breadcrumbs">
//           SEVASQUAD &gt; {category?.toUpperCase() || "SERVICE"}
//         </span>
//         <h1>
//           {category
//             ? `${category.charAt(0).toUpperCase() + category.slice(1)} Experts`
//             : "Gigs"}
//         </h1>
//         <p>
//           {`Expert ${
//             category || "service"
//           } services delivered by trusted SevaSquad professionals.`}
//         </p>
//         <div className="menu">
//           <div className="left">
//             <span>Budget</span>
//             <input ref={minRef} type="number" placeholder="min" />
//             <input ref={maxRef} type="number" placeholder="max" />
//             <button onClick={handleApplyFilters}>Apply</button>
//           </div>
//           <div className="right">
//             <span className="sortBy">Sort By :</span>
//             <span className="sortType">
//               {sort === "sales"
//                 ? "Best Selling"
//                 : sort === "createdAt"
//                 ? "Newest"
//                 : sort === "priceAsc"
//                 ? "Price: Low to High"
//                 : "Price: High to Low"}
//             </span>
//             <img
//               src="./img/down.png"
//               alt="Dropdown"
//               onClick={() => setOpen(!open)}
//             />
//             {open && (
//               <div className="rightMenu" ref={dropdownRef}>
//                 <span onClick={() => setSort("sales")}>Best Selling</span>
//                 <span onClick={() => setSort("createdAt")}>Newest</span>
//                 <span onClick={() => setSort("priceAsc")}>
//                   Price: Low to High
//                 </span>
//                 <span onClick={() => setSort("priceDesc")}>
//                   Price: High to Low
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="cards">
//           {filteredGigs.length === 0 ? (
//             <p>No gigs available for this category.</p>
//           ) : (
//             filteredGigs.map((gig) => (
//               <Link
//                 to={`/gigs/single/${gig._id}`}
//                 className="link"
//                 key={gig._id}
//                 onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//               >
//                 <GigCard item={gig} />
//               </Link>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Gigs;

import React, { useState, useRef, useEffect } from "react";
import newRequest from "../../utils/newRequest"; // Import newRequest
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gigs = () => {
  const [gigs, setGigs] = useState([]); // State to store gigs fetched from MongoDB
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [sort, setSort] = useState("sales");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(Infinity);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const category = params.get("cat");

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await newRequest.get(
          `/gigs${category ? `?cat=${category}` : ""}`
        );
        setGigs(response.data);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      }
    };

    fetchGigs(); // Call the fetch function when the component mounts
  }, [category]);

  useEffect(() => {
    let updatedGigs = [...gigs];
    updatedGigs = updatedGigs.filter(
      (gig) => gig.price >= min && gig.price <= max
    );

    updatedGigs.sort((a, b) => {
      if (sort === "sales") return b.sales - a.sales;
      if (sort === "createdAt")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "priceAsc") return a.price - b.price;
      if (sort === "priceDesc") return b.price - a.price;
      return 0;
    });

    setFilteredGigs(updatedGigs);
  }, [gigs, min, max, sort]);

  const handleApplyFilters = () => {
    const minValue = parseInt(minRef.current?.value || "0", 10);
    const maxValue = parseInt(maxRef.current?.value || Infinity, 10);

    if (!isNaN(minValue)) setMin(minValue);
    if (!isNaN(maxValue)) setMax(maxValue);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="gigs">
      <ToastContainer />
      <div className="container">
        <span className="breadcrumbs">
          SEVASQUAD &gt; {category?.toUpperCase() || "SERVICE"}
        </span>
        <h1>
          {category
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} Experts`
            : "Gigs"}
        </h1>
        <p>
          {`Expert ${
            category || "service"
          } services delivered by trusted SevaSquad professionals.`}
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={handleApplyFilters}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort By :</span>
            <span className="sortType">
              {sort === "sales"
                ? "Best Selling"
                : sort === "createdAt"
                ? "Newest"
                : sort === "priceAsc"
                ? "Price: Low to High"
                : "Price: High to Low"}
            </span>
            <img
              src="./img/down.png"
              alt="Dropdown"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu" ref={dropdownRef}>
                <span onClick={() => setSort("sales")}>Best Selling</span>
                <span onClick={() => setSort("createdAt")}>Newest</span>
                <span onClick={() => setSort("priceAsc")}>
                  Price: Low to High
                </span>
                <span onClick={() => setSort("priceDesc")}>
                  Price: High to Low
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {filteredGigs.length === 0 ? (
            <p>No gigs available for this category.</p>
          ) : (
            filteredGigs.map((gig) => (
              <Link
                to={`/gigs/single/${gig._id}`}
                className="link"
                key={gig._id}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <GigCard item={gig} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
