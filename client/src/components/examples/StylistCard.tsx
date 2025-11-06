import StylistCard from '../StylistCard';
import stylistImage from '@assets/generated_images/Female_stylist_portrait_c9075e53.png';

export default function StylistCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <StylistCard 
        name="林美華"
        specialty="染燙專家"
        experience="8年專業經驗"
        image={stylistImage}
      />
    </div>
  );
}
