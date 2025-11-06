import ServiceCard from '../ServiceCard';
import serviceImage from '@assets/generated_images/Hair_cutting_service_ac14a7f9.png';

export default function ServiceCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ServiceCard 
        title="專業剪髮"
        description="根據您的臉型與個性，打造專屬於您的髮型"
        price="NT$ 800 起"
        image={serviceImage}
      />
    </div>
  );
}
