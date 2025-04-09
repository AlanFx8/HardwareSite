const MainContentWrapper = ({ children } : { children: React.ReactNode }) => {
    return (
        <main id="main-content">
            { children }
        </main>
    )
}

export default MainContentWrapper