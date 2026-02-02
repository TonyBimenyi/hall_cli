<template>
    <div class="dashboard_details">
        <div class="cards">
            <div class="card">
                <div class="card_info">
                    <div class="p">Total Bookings</div>
                    <div class="number">1,234</div>
                    <div class="trend">+5% since last month</div>
                </div>
                <div class="icon">
                    <i class="fas fa-book"></i>
                </div>
            </div>
            <div class="card">
                <div class="card_info">
                    <div class="p">Total Bookings</div>
                    <div class="number">1,234</div>
                    <div class="trend">+5% since last month</div>
                </div>
                <div class="icon">
                    <i class="fas fa-users"></i>
                </div>
            </div>
            <div class="card">
                <div class="card_info">
                    <div class="p">Total Bookings</div>
                    <div class="number">1,234</div>
                    <div class="trend">+5% since last month</div>
                </div>
                <div class="icon">
                    <i class="fas fa-dollar-sign"></i>
                </div>
            </div>
            <div class="card">
                <div class="card_info">
                    <div class="p">Total Bookings</div>
                    <div class="number">1,234</div>
                    <div class="trend">+5% since last month</div>
                </div>
                <div class="icon">
                    <i class="fas fa-chart-line"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard_details{
    margin-top: 20px;
}
.cards{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
}
.icon i {
    color: white;
    font-size: 22px;
}
.card{
    background: #fff;
    padding: 35px 20px;      
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 21%;
}
.card_info .p{
    font-size: 14px;
    color: #6b7280;
}
.card_info .number{
    font-size: 28px;
    font-weight: 700;
    margin: 8px 0;
}
.card_info .trend{
    font-size: 12px;
    color: #10b981;
}
.icon{
    background: #061b49;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon .iconify{
    color: white;
    font-size: 22px;
}
</style>