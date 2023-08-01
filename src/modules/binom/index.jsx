import React from 'react'
import PageHeader from "../../components/common/PageHeader";

// import defaultBinomValue from "./binomFormValue";

const Binom = () => {
    // const [formValue, setFormValue] = React.useState(defaultBinomValue)

  return (
      <div className="py-6">
        <div className="flex flex-col">
          <PageHeader
              header="Binom companion"
              showBack={false}
          />
        </div>
      </div>
  )
}

export default Binom