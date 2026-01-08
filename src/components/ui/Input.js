import React from 'react';

const Input = React.forwardRef(({ 
  label, 
  error, 
  helperText, 
  startIcon, 
  endIcon,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
            ${startIcon ? 'pl-10' : ''}
            ${endIcon ? 'pr-10' : ''}
            ${error ? 'border-red-300 text-red-900' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {endIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

// import React from 'react';

// const Input = React.forwardRef(({ 
//   label, 
//   error, 
//   helperText, 
//   startIcon, 
//   endIcon,
//   className = '',
//   children, // 👈 Destructure 'children' prop to check for options
//   ...props 
// }, ref) => {
//     
//   // 1. Determine which element to render: <select> if children are present, otherwise <input>
//   const Element = children ? 'select' : 'input';

//   // Set base styles for the main input/select field
//   const baseStyles = `
//     block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
//     ${startIcon ? 'pl-10' : ''}
//     ${endIcon ? 'pr-10' : ''}
//     ${error ? 'border-red-300' : 'border-gray-300'}
//     ${className}
//   `;

//   return (
//     <div className="w-full">
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           {label}
//         </label>
//       )}
//       <div className="relative">
//         {startIcon && (
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             {startIcon}
//           </div>
//         )}
        
//         {/* 2. Dynamically render <input /> or <select> */}
//         <Element
//           ref={ref}
//           className={baseStyles}
//           // Add placeholder text only for input, not select
//           {...(Element === 'input' ? { placeholder: props.placeholder || '' } : {})}
//           {...props}
//         >
//           {children} {/* 👈 Pass children (options) only when Element is 'select' */}
//         </Element>

//         {endIcon && (
//           <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//             {endIcon}
//           </div>
//         )}
//       </div>
//       {error && (
//         <p className="mt-1 text-sm text-red-600">{error}</p>
//       )}
//       {helperText && !error && (
//         <p className="mt-1 text-sm text-gray-500">{helperText}</p>
//       )}
//     </div>
//   );
// });

// Input.displayName = 'Input';

// export default Input;



// // import React from 'react';

// // const Input = React.forwardRef(({ 
// //   label, 
// //   error, 
// //   helperText, 
// //   startIcon, 
// //   endIcon,
// //   className = '',
// //   ...props 
// // }, ref) => {
// //   return (
// //     <div className="w-full">
// //       {label && (
// //         <label className="block text-sm font-medium text-gray-700 mb-1">
// //           {label}
// //         </label>
// //       )}
// //       <div className="relative">
// //         {startIcon && (
// //           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //             {startIcon}
// //           </div>
// //         )}
// //         <input
// //           ref={ref}
// //           className={`
// //             block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm
// //             ${startIcon ? 'pl-10' : ''}
// //             ${endIcon ? 'pr-10' : ''}
// //             ${error ? 'border-red-300' : 'border-gray-300'}
// //             ${className}
// //           `}
// //           {...props}
// //         />
// //         {endIcon && (
// //           <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
// //             {endIcon}
// //           </div>
// //         )}
// //       </div>
// //       {error && (
// //         <p className="mt-1 text-sm text-red-600">{error}</p>
// //       )}
// //       {helperText && !error && (
// //         <p className="mt-1 text-sm text-gray-500">{helperText}</p>
// //       )}
// //     </div>
// //   );
// // });

// // Input.displayName = 'Input';

// // export default Input;