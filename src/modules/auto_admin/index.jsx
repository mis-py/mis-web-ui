import React from 'react'
import PageHeader from "../../components/common/PageHeader";

// import defaultBinomValue from "./binomFormValue";

const AutoAdmin = () => {
    // const [formValue, setFormValue] = React.useState(defaultBinomValue)

  return (
      <div className="py-6">
          <div className="flex flex-col">
              <PageHeader
                  header="Auto admin"
                  showBack={false}
              />
          </div>
      </div>
  )
}

export default AutoAdmin;
